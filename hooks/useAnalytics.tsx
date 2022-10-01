import React, { useEffect, useState } from "react";
export default function useAnalytics() {
  return {
    anaylitics: {
      artworks: 0,
      users: 0,
      events: 0,
      articles: 0,
    },
    loading: false,
  };
}
