import "../styles/scss/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-50 mx-auto py-5">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
