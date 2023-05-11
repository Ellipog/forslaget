import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {
	forslag: any;
	setForslag: any;
	setUpdate: any;
	update: any;
};

const Forslag = (props: Props) => {
	const { data: session } = useSession<any>();
	const time = new Date(props.forslag.tid);

	function accept(accepted: string) {
		if (accepted === "yes") {
			axios.post(`/api/godta${props.forslag.type}Forslag`, {
				type: props.forslag.type,
				beskrivelse: props.forslag.beskrivelse,
				tittel: props.forslag.tittel,
				sted: props.forslag.sted,
				tid: props.forslag.tid,
				status: "👍godkjent",
			});
			toast.success("Godkjent! Refresh siden får å se endringene!");
		} else if (accepted === "no") {
			axios.post(`/api/godta${props.forslag.type}Forslag`, {
				type: props.forslag.type,
				beskrivelse: props.forslag.beskrivelse,
				tittel: props.forslag.tittel,
				sted: props.forslag.sted,
				tid: props.forslag.tid,
				status: "👎avslått",
			});
			toast.success("Avslått! Refresh siden får å se endringene!");
		}
		setTimeout(() => {
			props.setUpdate(!props.forslag.update);
		}, 1000);
	}

	// @ts-ignore
	return session?.user.isAdmin && props.forslag.status === "🛠️venter" ? (
		<div className="flex justify-center items-center flex-row w-5/6 gap-6">
			<div className="w-5/6">
				<div className="bg-gray-400 p-2 rounded-xl w-full flex justify-center items-left flex-col">
					<h1 className="font-bold">{props.forslag.tittel}</h1>
					<p className="w-full overflow-contain">{props.forslag.beskrivelse}</p>
					<div className="flex flex-row justify-between">
						<p className="text-gray-700">{props.forslag.sted}</p>
					</div>
					<p className="w-full flex flex-row justify-between">
						<span>{props.forslag.status}</span>
						<span>{time.toLocaleDateString()}</span>
					</p>
				</div>
			</div>
			<div className="bg-gray-400 p-2 rounded-xl h-full w-1/12 flex justify-around items-center flex-col">
				<FontAwesomeIcon icon={faThumbsUp} className="w-7 h-7 text-green-700" onClick={() => accept("yes")} />
				<FontAwesomeIcon icon={faThumbsDown} className="w-7 h-7 text-red-700" onClick={() => accept("no")} />
			</div>
		</div>
	) : (
		<div className="flex justify-center items-center flex-col w-5/6">
			<div className="bg-gray-400 p-2 rounded-xl w-full flex justify-center items-left flex-col">
				<h1 className="font-bold">{props.forslag.tittel}</h1>
				<p className="w-full overflow-contain">{props.forslag.beskrivelse}</p>
				<div className="flex flex-row justify-between">
					<p className="text-gray-700">{props.forslag.sted}</p>
				</div>
				<p className="w-full flex flex-row justify-between">
					<span>{props.forslag.status}</span>
					<span>{time.toLocaleDateString()}</span>
				</p>
			</div>
		</div>
	);
};

export default Forslag;
