import db from "./../../db";

// Get articles from followed users with optional pagination and search
export async function getFeedArticles(
  userId: number,
  limit: number,
  offset: number,
  search: string | undefined
) {
  const followedUsers = await db.userFollower.findMany({
    where: {
      followerId: userId,
    },
  });

  return db.article.findMany({
    where: {
      authorId: {
        in: followedUsers.map((user: any) => user.followingId),
      },
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          content: {
            contains: search,
          },
        },
      ],
    },
    take: limit,
    skip: offset,
  });
}

// Get the list of users the current user is following and their followers
export async function getFollowingUsers(userId: number) {
  const followers = await db.userFollower
    .findMany({
      where: {
        followingId: userId,
      },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })
    .then((data: any) => {
      return data.map((user: any) => user.follower);
    });

  const following = await db.userFollower
    .findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })
    .then((data: any) => {
      return data.map((user: any) => user.following);
    });

  return {
    followers,
    following,
  };
}

// Follow a user by their user ID
export async function followUser(userId: number, followUserId: number) {
  try {
    await db.userFollower.create({
      data: {
        followerId: userId,
        followingId: followUserId,
      },
    });
  } catch (error) {
    throw new Error("User already followed");
  }
}

// Unfollow a user by their user ID
export async function unfollowUser(userId: number, unfollowUserId: number) {
  try {
    await db.userFollower.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: unfollowUserId,
        },
      },
    });
  } catch (error) {
    throw new Error("User not followed");
  }
}
