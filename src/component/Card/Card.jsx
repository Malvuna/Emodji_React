
export function Card({symbol, title, keywords}) {
  return (
    <div className="divCard">
      <div className="divCard__img">{symbol}</div>
      <div className="divCard__titel">{title}</div>
      <div className="divCard__desc">{keywords}</div>
    </div>
  );
}
