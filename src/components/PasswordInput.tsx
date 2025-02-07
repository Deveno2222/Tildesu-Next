import React, { useState } from "react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOff } from "lucide-react"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        const [showPass, setShowPass] = useState(false)
        return (
            <div className="relative">
                <Input
                    type={showPass ? "text" : "password"}
                    className={cn(className, 'pe-10')}
                    ref={ref}
                    {...props}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} title={showPass ? "Скрыть пароль" : "Показать пароль"} className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground">{showPass ? <EyeOff className="size-5" /> : <EyeIcon className="size-5"/>}</button>
            </div>
        )
    }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }