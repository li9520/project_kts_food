import { useEffect, useState } from "react";

import axios from "axios";

export type ResourceProps = {
  url: string;
  render: Function;
  setData: Function;
};

const Resource: React.FC<ResourceProps> = ({ url, render, setData }) => {
  const [error, setError] = useState(false);
  const [card, setCard] = useState(null);

  const fetchData = async () => {
    await axios({
      method: "get",
      url: `${url}`,
    })
      .then((response) => {
        return setCard(setData(response.data));
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
