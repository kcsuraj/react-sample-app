function CardList({ data }) {
  return (
    <div>
      {data.map((value, index) => (
        <p key={index}>{value.title}</p>
      ))}
    </div>
  );
}

export default CardList;
