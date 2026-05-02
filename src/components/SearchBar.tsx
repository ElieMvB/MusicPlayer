export function SearchBar ({placeholder, value, onChange} : 
    {value:string, placeholder:string, onChange:((s: string) => void)}) {
    return (
        <div>
            <input
                type="text"
                value={value}
                className="border rounded px-3 py-2 w-full mt-4 border-solid border-2 text-lg 
                            text-purple-400 border-purple-500"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}