export async function getRooms() {

  const payload = await fetch('/api/rooms', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await payload.json();
  if (!response.success || payload.status !== 200) return {}

  return response.data;
};

