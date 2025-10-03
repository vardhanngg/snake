import LobbyScreen from '../LobbyScreen';

export default function LobbyScreenExample() {
  return (
    <LobbyScreen 
      onJoinRoom={(code) => console.log('Joined room:', code)} 
    />
  );
}
