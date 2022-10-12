export async function getWatchedVideos(userId, token) {
  const operationsDoc = `
  query getWatchedVideos($userId: String!) {
    stats(where: {
      watched: {_eq: true},
      userId: {_eq: $userId}
    }) {
      videoId
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "getWatchedVideos",
    {
      userId,
    },
    token
  );

  return response?.data?.stats;
}

export async function createStats(
  token,
  { favourited, userId, watched, videoId }
) {
  const operationsDoc = `
  mutation createStats ($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {
      favourited: $favourited,
      userId: $userId,
      videoId: $videoId,
      watched: $watched
    }) {
        favourited
        userId
    }
  }
`;

  return await queryHasuraGraphQL(
    operationsDoc,
    "createStats",
    { favourited, userId, watched, videoId },
    token
  );
}

export async function updateStats(
  token,
  { favourited, userId, watched, videoId }
) {
  const operationsDoc = `
  mutation updateStats ($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {    
    update_stats(
      _set: {watched: $watched, favourited: $favourited}, 
      where: {
        userId: {_eq: $userId},
        videoId: {_eq: $videoId}
      }) {
      returning {
        favourited,
        userId,
        watched,
        videoId
      }
    }
  }
`;

  return await queryHasuraGraphQL(
    operationsDoc,
    "updateStats",
    { favourited, userId, watched, videoId },
    token
  );
}

export async function findVideoIdByUser(userId, videoId, token) {
  const operationsDoc = `
  query findVideoIdByUserId ($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
          id
        userId
        watched
        videoId
        favourited
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    { videoId, userId },
    token
  );

  return response?.data?.stats;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );

  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}
    }) {
      id
      email
      issuer
    }
  }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
}

async function queryHasuraGraphQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
