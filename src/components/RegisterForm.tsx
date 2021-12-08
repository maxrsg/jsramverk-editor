import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { registerUser } from "../data/Auth";

export const RegisterForm = (props: HTMLChakraProps<"form">) => {
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        if (password === confirm) {
          let res = await registerUser(email, password);
          console.log(res);
          if (res === 200) {
            history.push("/login");
          }
        }
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <Flex justify="space-between">
            <FormLabel>Password</FormLabel>
            <Box
              as="a"
              color={mode("blue.600", "cyan.300")}
              fontWeight="semibold"
              fontSize="sm"
            ></Box>
          </Flex>
          <InputGroup>
            <InputRightElement>
              <IconButton
                bg="transparent !important"
                variant="ghost"
                aria-label={isOpen ? "Mask password" : "Reveal password"}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              name="password"
              type={isOpen ? "text" : "password"}
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl id="confirm">
          <Flex justify="space-between">
            <FormLabel>Confirm password</FormLabel>
            <Box
              as="a"
              color={mode("blue.600", "cyan.300")}
              fontWeight="semibold"
              fontSize="sm"
            ></Box>
          </Flex>
          <InputGroup>
            <InputRightElement>
              <IconButton
                bg="transparent !important"
                variant="ghost"
                aria-label={isOpen ? "Mask password" : "Reveal password"}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              name="confirm"
              type={isOpen ? "text" : "password"}
              required
              onChange={(e) => setConfirm(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme="cyan" size="lg" fontSize="md">
          Register account
        </Button>
      </Stack>
    </chakra.form>
  );
};
