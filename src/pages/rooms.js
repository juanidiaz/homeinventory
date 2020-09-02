import Link from 'next/link';
import Button from '@material-ui/core/Button';
import RoomsInput from '../../components/input/RoomsInput';
import RoomsList from '../../components/lists/RoomsList';

export default function roomsPage() {
  const [showElements, setShowElements] = React.useState(true);



  return (
    <div>
      <h3>ROOMS</h3>

      <Button variant="contained" color="primary" onClick={() => setShowElements(true)}>Show all rooms</Button>
      <Button variant="contained" color="primary" onClick={() => setShowElements(false)}>Add new room</Button>

      {showElements ?
        <RoomsList />
        :
        <RoomsInput />
      }

    </div>
  )
}
