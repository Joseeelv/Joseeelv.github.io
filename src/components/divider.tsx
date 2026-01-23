export default function Divider() {
  return (
    <div
      className="hero-hr w-full lg:w-auto h-1 border-none mx-auto lg:mx-0 mb-8 rounded-sm opacity-70"
      style={{
        background:
          "linear-gradient(90deg, rgba(0, 224, 255, 1) 0%, rgba(0, 255, 153, 1) 100%)",
        boxShadow:
          "0 0 14px rgba(0, 224, 255, 1), 0 0 25px rgba(0, 255, 153, 1)",
      }}
    ></div>
  );
}
