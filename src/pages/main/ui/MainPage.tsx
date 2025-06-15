'use client'

import { Grid } from "@/widgets/grid";
import { FC, Suspense } from "react";

export const MainPage: FC = () => {

  return (
    <div>
      <main>
        <Suspense>
          <Grid />
        </Suspense>
      </main>
    </div>
  );
};
