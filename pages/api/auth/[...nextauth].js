import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const contactsCollection = client.db().collection('contacts');

        const contact = await contactsCollection.findOne({
          loginEmail: credentials.email.toLowerCase(),
        });

        if (!contact) {
          client.close();
          throw new Error('No contact found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          contact.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();

        const userInfo = { ...contact };
        userInfo._id ? delete userInfo._id : null
        userInfo.password ? delete userInfo.password : null
        userInfo.createdAt ? delete userInfo.createdAt : null
        userInfo.updatedAt ? delete userInfo.updatedAt : null
        userInfo.__v ? delete userInfo.__v : null

        return {
          email: contact.loginEmail,
          name: contact.name,
          image: userInfo
        };

      },
    }),
  ],
});
