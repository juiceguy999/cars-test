'use client'

import { Grid } from "@/widgets/grid";
import { FC, Suspense } from "react";

const MainPage: FC = () => {

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

export default MainPage;