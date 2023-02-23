import { Loader, LoaderSize } from "@components/Loader";

const isEmpty = (props: any) => {
  return Object.keys(props).length === 0;
};

const LoadingHOC = (Component: React.FC<any>) => {
  const WrappedComponent = (props: any) => {
    return isEmpty(props) ? (
      <Loader size={LoaderSize.l} />
    ) : (
      <Component {...props} />
    );
  };
  return WrappedComponent;
};

export default LoadingHOC;
