const TextInput = ({ placeholder, value, onInput }) => (
    <input
        type="text"
        style={{padding: ".5rem"}}
        value={value}
        onInput={onInput}
        placeholder={placeholder}
    />
);

export default TextInput;
