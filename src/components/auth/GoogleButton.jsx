import { FcGoogle } from "react-icons/fc";

import Button from "../ui/Button";

function GoogleButton({

  onClick,

  loading = false

}) {

  return (

    <Button

      variant="outline"

      fullWidth

      loading={loading}

      leftIcon={<FcGoogle size={22} />}

      onClick={onClick}

    >

      Continue with Google

    </Button>

  );

}

export default GoogleButton;