import { useState } from "react";

export function useLoadingButton() {
  const [loading, setLoading] = useState(false);

  const wrap = async (asyncFn) => {
    setLoading(true);
    try {
      await asyncFn();
    } finally {
      setLoading(false);
    }
  };

  return { loading, wrap };
}
