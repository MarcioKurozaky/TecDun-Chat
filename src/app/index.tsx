import { Redirect } from "expo-router";

export default function Index() {
  const isAuth = false;

  if (!isAuth) {
    return <Redirect href="/auth" />;
  }

  return <Redirect href="/chat" />;
}
 "#000",
    fontSize: 18,
    fontWeight: "500",
  },
});
