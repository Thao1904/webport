const AdminButton = ({ label, className, action }) => {
  return <button className={className} onClick={action}>{label}</button>;
};

export default AdminButton;
