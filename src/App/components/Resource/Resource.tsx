import { useEffect, useState } from "react";

import axios from "axios";
/*
export type ResourceProps = {
  url: string;
  render: Function;
  setData: Function;
};
*/
export type ResourceProps<T> = {
  url: string;
  render: (data: T | null) => React.ReactElement;
};

const Resource = <T extends object>({ url, render }: ResourceProps<T>) => {
  const [error, setError] = useState(false);
  const [card, setCard] = useState(null);

  const fetchData = async () => {
    await axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        return setCard(response.data);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>error!</div>;

  return render(card);
};

export default Resource;
