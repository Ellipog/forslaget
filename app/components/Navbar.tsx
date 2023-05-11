import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<div className="w-24 h-screen bg-[#404040] flex justify-top items-center flex-col pt-5 gap-5">
			<Link href="/">
				<div className="p-2 flex justify-center items-center text-[#E0E0E0]">
					<FontAwesomeIcon icon={faHome} className="w-10 h-10" />
				</div>
			</Link>
			<Link href="/account">
				<div className="p-2 flex justify-center items-center text-[#E0E0E0]">
					<FontAwesomeIcon icon={faUser} className="w-10 h-10" />
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
