


type Props = {
    value: { id: number, name: string }[],
    onChange: (newValue: { id: number, name: string }[]) => void,
    placeholder: string,
    apiUrl: string
}

const Select = (props: Props) => {
    return 'Select component'
}

export default Select