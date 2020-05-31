import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default function Loading() {
    return (
        <PulseLoader color={"#0275d8"} size={8}>
            <span className="sr-only">
                <h4>Twiddling thumbs ... just a sec</h4>
            </span>
        </PulseLoader>
    );
}
