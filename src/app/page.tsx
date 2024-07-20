import { useGetUserServer } from '@/lib/hooks/getUserServer';
import { Button } from '@nextui-org/react';

export default async function Home() {
  const user = await useGetUserServer();
  return (
    <div>
      <Button>Click me</Button>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
