import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  forslag: any;
};

const Forslag = (props: Props) => {
  const { data: session, status } = useSession();
  const time = new Date(props.forslag.tid);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="bg-gray-400 p-2 rounded-xl w-5/6 flex justify-center items-left flex-col">
        <h1 className="font-bold">{props.forslag.tittel}</h1>
        <p>{props.forslag.beskrivelse}</p>
        <div className="flex flex-row justify-between">
          <p>{props.forslag.sted}</p>
          <p>{time.toLocaleDateString()}</p>
        </div>
      </div>
      <p className="w-10/12 flex items-left">{props.forslag.status}</p>
    </div>
  );
};

export default Forslag;
