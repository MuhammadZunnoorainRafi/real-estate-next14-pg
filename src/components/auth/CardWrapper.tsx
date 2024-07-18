import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Link from 'next/link';

type CardWrapperType = {
  children: React.ReactNode;
  headerLable: string;
  backButtonLable: string;
  backButtonHref: string;
};

function CardWrapper({
  headerLable,
  backButtonLable,
  backButtonHref,
  children,
}: CardWrapperType) {
  return (
    <Card className="rounded-lg p-10 border-slate-800 w-[400px]">
      <CardHeader>
        <h1 className="font-bold text-3xl text-center w-full">{headerLable}</h1>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter>
        <Link href={backButtonHref} className="text-sm hover:underline">
          {backButtonLable}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
