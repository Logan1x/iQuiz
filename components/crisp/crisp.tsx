"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("b1a355ce-c23e-4f5f-930b-8c6723f6c559");
  });

  return null;
};

export default CrispChat;
