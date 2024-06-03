function notFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(
    JSON.stringify({
      message: `404 - ${req.url} not found !`,
    })
  );
  res.end();
}

const RouteHandler = {
  notFound,
};

module.exports = RouteHandler;
