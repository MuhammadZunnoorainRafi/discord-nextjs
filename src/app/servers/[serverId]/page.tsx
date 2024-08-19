type Props = {
  params: {
    serverId: string;
  };
};

function ServerPage({ params }: Props) {
  return <div>{params.serverId}</div>;
}

export default ServerPage;
