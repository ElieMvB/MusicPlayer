import {createContext, useContext, useState} from "react";
import type {ReactNode} from "react";


type ContextType = {
    musics: string[],
    setMusics: React.Dispatch<React.SetStateAction<string[]>>,
    currentMusic: number,
    setCurrentMusic: React.Dispatch<React.SetStateAction<number>>,
    currentPlaylist: string,
    setCurrentPlaylist: React.Dispatch<React.SetStateAction<string>>,
    numberMusics: number,
    setNumberMusics: React.Dispatch<React.SetStateAction<number>>,
    oldMusics: {"music": string, "playlist": string}[],
    setOldMusics: React.Dispatch<React.SetStateAction<{"music": string, "playlist": string}[]>>;
}

const AppContext = createContext<ContextType | undefined>(
    undefined
);

type AppProviderProps = {
    children: ReactNode;
}

export function AppProvider({children}: AppProviderProps) {
    const [musics, setMusics] = useState<string[]>([]);
    const [currentMusic, setCurrentMusic] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState('');
    const [numberMusics, setNumberMusics] = useState(0);
    const [oldMusics, setOldMusics] = useState<{"music": string, "playlist": string}[]>([]);

    return (
        <AppContext.Provider value={{musics, setMusics, currentMusic, setCurrentMusic, 
                                    currentPlaylist, setCurrentPlaylist, numberMusics, 
                                    setNumberMusics, oldMusics, setOldMusics}}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error (
            "useAppContext must be inside AppProvider"
        )
    }
    return context;
}

