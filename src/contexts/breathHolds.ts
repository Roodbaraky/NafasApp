import { Dispatch, SetStateAction, createContext } from "react";
interface BreathHoldsProps {
    breathHolds: number[] | null;
    setBreathHolds: Dispatch<SetStateAction<number[] | null>>;
}

export const BreathHolds = createContext<BreathHoldsProps>({ breathHolds: null, setBreathHolds: () => { } })