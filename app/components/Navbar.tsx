import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPerson, faUser } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<div className="w-24 h-screen bg-gray-500 flex justify-top items-center flex-col pt-5 gap-5">
			<Link href="/">
				<div className="bg-gray-400 p-2 rounded-xl flex justify-center items-center">
					<FontAwesomeIcon icon={faHome} className="w-10 h-10" />
				</div>
			</Link>
			<Link href="/account">
				<div className="bg-gray-400 p-2 rounded-xl flex justify-center items-center">
					<FontAwesomeIcon icon={faUser} className="w-10 h-10" />
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
