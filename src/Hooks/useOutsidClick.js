import { useEffect } from "react";

export default function useOutsidClick(ref, exceptionid, cb) {
    useEffect(() => {
        function handleOutsidClick(event) {
            if (ref.current && !ref.current.contains(event.target) && event.target.id !== exceptionid) {
                cb()
            }
        }

        document.addEventListener("mousedown", handleOutsidClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsidClick)
        }
    }, [ref, cb])

}