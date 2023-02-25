import { Loader, LoaderSize } from "@components/Loader";

const isEmpty = (prop: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (Array.isArray(prop) && prop.length === 0) ||
    Object.keys(prop).length === 0
  );
};

const LoadingHOC = (Component: React.FC<any>, propName: string) => {
  const WrappedComponent = (prop: any) => {
    return isEmpty(prop[propName]) ? (
      <Loader size={LoaderSize.l} />
    ) : (
      <Component {...prop} />
    );
  };
  return WrappedComponent;
};

export default LoadingHOC;
