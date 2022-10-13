export interface TextareaAutosizeProps {
    style?: {},
    className?: string,
    placeholder?: string,
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void,
    maxRows?: number | undefined,
    minRows?: number | undefined,
    rows?:  number | undefined,
    value?: string | string[] | number,
}

export interface StyleStateProps{
    outerHeightStyle?: number,
    overflow?: boolean,
    
}