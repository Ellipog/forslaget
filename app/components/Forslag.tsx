import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {
  forslag: any;
  setForslag: any;
};

const Forslag = (props: Props) => {
  const { data: session } = useSession<any>();
  const time = new Date(parseInt(props.forslag.tid));

  function accept() {
    axios.post(`/api/godta${props.forslag.type}Forslag`, {
      type: props.forslag.type,
      beskrivelse: props.forslag.beskrivelse,
      tittel: props.forslag.tittel,
      sted: props.forslag.sted,
      tid: props.forslag.tid,
      status: "👍godkjent",
    });
    toast.success("Godkjent! Refresh siden får å se endringene!");
  }

  // @ts-ignore
  return session?.user.isAdmin && props.forslag.status === "🛠️venter" ? (
    <div className="flex justify-around items-center flex-row">
      <div className="w-5/6">
        <div className="bg-gray-400 p-2 rounded-xl w-full flex justify-center items-left flex-col">
          <h1 className="font-bold">{props.forslag.tittel}</h1>
          <p className="w-[38rem] overflow-hidden whitespace-pre-wrap">{props.forslag.beskrivelse}</p>
          <div className="flex flex-row justify-between">
            <p>{props.forslag.sted}</p>
            <p>{time.toLocaleDateString()}</p>
          </div>
        </div>
        <p className="w-10/12 flex items-left">{props.forslag.status}</p>
      </div>
      <div className="bg-gray-400 p-2 rounded-xl h-full w-1/12 flex justify-around items-center flex-col">
        <FontAwesomeIcon icon={faThumbsUp} className="w-7 h-7 text-green-700" onClick={() => accept()} />
        <FontAwesomeIcon icon={faThumbsDown} className="w-7 h-7 text-red-700" onClick={() => reject()} />
      </div>
    </div>
  ) : (
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
