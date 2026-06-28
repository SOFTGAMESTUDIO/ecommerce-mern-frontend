function Spinner({

  size = 20

}) {

  return (

    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >

      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity=".2"
      />

      <path
        fill="currentColor"
        d="M22 12A10 10 0 0012 2v3a7 7 0 017 7h3z"
      />

    </svg>

  );

}

export default Spinner;