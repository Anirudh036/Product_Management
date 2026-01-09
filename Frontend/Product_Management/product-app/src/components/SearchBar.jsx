const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by product name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;