interface props {
  className?: string;
  children?: any;
  size: string;
}
const Col: React.FC<props> = (props) => (
  <div className={`col-${props.size || '4'} ${props.className || ''}`}>
    {props.children}
  </div>
);

export default Col;
