import WaitingRoom from '../WaitingRoom';

export default function WaitingRoomExample() {
  return (
    <WaitingRoom 
      roomCode="battle123" 
      onLeave={() => console.log('Left room')} 
    />
  );
}
