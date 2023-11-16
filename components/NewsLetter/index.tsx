import newsletterSectionClasses from "./newsLetterClassNames";
const NewsLetter = () => {
  const {
    container,
    heading,
    subHeading,
    cardContainer,
    cardLeft,
    cardHeading,
    cardSubHeading,
    formContainer,
    inputField,
    button,
  } = newsletterSectionClasses;
  return (
    <section className={container}>
      <h2 className={heading}>Stay in the Loop</h2>
      <p className={subHeading}>
        Subscribe to Our Newsletter for Exclusive Games Updates, Offers, Tips.
      </p>
      <div className={cardContainer}>
        <div className={cardLeft}>
          <h3 className={cardHeading}>Sign Up for Our Newsletter</h3>
          <p className={cardSubHeading}>
            Get the latest news and updates delivered straight to your inbox.
          </p>
        </div>
        <form action="" className={formContainer}>
          <input
            type="email"
            placeholder="Enter your Email"
            className={inputField}
          />
          <button type="button" className={button}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
