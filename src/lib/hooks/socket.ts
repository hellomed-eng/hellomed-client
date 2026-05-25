import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useCallback } from "react";
import {
  CheckInFromBoardOutputs,
  CheckInFormBoardDisplay,
} from "@/lib/types/check-in";
import { formatDate } from "@/lib/features/utils";

export default function useCheckInListUpdaterSocket(
  setCheckIns: React.Dispatch<
    React.SetStateAction<CheckInFromBoardOutputs | undefined>
  >,
  currentPage: number
) {
  const socketRef = useRef<Socket | null>(null);

  const handleNewCheckin = useCallback(
    (newCheckIn: CheckInFormBoardDisplay) => {
      if (currentPage !== 0) {
        return;
      }
      newCheckIn.birthDate = formatDate(
        newCheckIn.birthDate,
        "MM/dd/yyyy",
        "UTC",
      );

      setCheckIns((prevState) => {
        if (!prevState) return prevState; // Early return if no state exists yet
        const updatedCheckIns = [...prevState.checkIns];

        // push front, pop back like a queue
        updatedCheckIns.unshift(newCheckIn);
        updatedCheckIns.pop();

        // Increment the totalCheckIns count
        const updatedTotalCheckIns = prevState.totalCheckIns + 1;

        // Return the new state
        return {
          checkIns: updatedCheckIns,
          totalCheckIns: updatedTotalCheckIns,
        };
      });
    },
    [currentPage, setCheckIns]
  );

  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      return;
    }
    socketRef.current = io(process.env.NEXT_PUBLIC_WEBSOCKET_ORIGIN, {
      transports: ["websocket"],
    });

    socketRef.current.on("new-checkin", handleNewCheckin);

    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.off("new-checkin", handleNewCheckin);
        socketRef.current?.disconnect();
      }
    };
  }, [handleNewCheckin]);

  return socketRef;
}
