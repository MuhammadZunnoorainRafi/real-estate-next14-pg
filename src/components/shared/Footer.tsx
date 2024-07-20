function Footer() {
  return (
    <div className="text-center font-mono font-bold py-5 bg-slate-950 text-white">
      {new Date().toDateString()}
    </div>
  );
}

export default Footer;
