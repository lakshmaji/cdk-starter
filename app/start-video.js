const Chime = require("aws-sdk/clients/chime");
const { v4: uuidv4 } = require("uuid");

chime = new Chime({
  region: "us-east-1",
});

function response(statusCode, contentType, body) {
  return {
    statusCode: statusCode,
    headers: { "Content-Type": contentType },
    body: body,
  };
}

exports.main = async function (event) {
  const query = event.queryStringParameters;
  if (!query.region) {
    return response(
      400,
      "application/json",
      JSON.stringify({
        error: "Required properties: region",
      })
    );
  }

  const meetingConfig = {
    ClientRequestToken: uuidv4(),
    MediaRegion: query.region,
  };

  try {
    meetingInfo = await chime.createMeeting(meetingConfig).promise();
    console.log(JSON.stringify(meetingInfo, null, 2));
    return response(
      200,
      "application/json",
      JSON.stringify({
        meetingInfo,
      })
    );
  } catch (err) {
    return response(
      500,
      "application/json",
      JSON.stringify({
        error: "Something went wrong",
      })
    );
  }
};
