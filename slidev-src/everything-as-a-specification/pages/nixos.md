---
title: NixOS
layout: section
---

<img src="/images/nixos-logo.webp" class="w-24" />

# NixOS

---

## Evolution of your Installation

<v-clicks>

```bash
cat /etc/os-release | grep "NAME="
# NAME="Arch Linux"
```

Lets create a user for myself.

```bash
useradd -m -c "George Roe" -G wheel georger 
passwd georger
```

I want to use docker on my system.

```bash
pacman -S docker
systemctl enable --now docker.service
usermod -aG docker georger
```

I want to use `zsh` insead of `bash` as my default shell.

```bash
# Logged in as georger
chsh -s /user/bin/zsh
```

</v-clicks>

---

## Evolution of your NixOS Configuration

Lets do the same again, but in NixOS.

````md magic-move

```nix
users.users.georger = {
  isNormalUser = true;
  description = "George Roe";
  extraGroups = [ "wheel" ];
};
```

```nix
users.users.georger = {
  isNormalUser = true;
  description = "George Roe";
  extraGroups = [ "wheel" "docker" ];
};

virtualisation.docker.enable = true;
```

```nix
users.users.georger = {
  isNormalUser = true;
  description = "George Roe";
  extraGroups = [ "wheel" "docker" ];
  shell = pkgs.zsh;
};

virtualisation.docker.enable = true;
```

````

---
layout: center
---

```nix
hardware.graphics = {
  enable = true;
  enable32Bit = true;
  extraPackages = with pkgs; [
    mesa
    intel-media-driver
    intel-compute-runtime
    vulkan-validation-layers
  ];
};

services.xserver.videoDrivers = [ "nvidia" ];

hardware.nvidia = {
  modesetting.enable = true;
  nvidiaPersistenced = true;
  powerManagement.enable = false;
  open = false;
  package = config.boot.kernelPackages.nvidiaPackages.stable;
};

hardware.nvidia.prime = {
  offload.enable = true;
  offload.enableOffloadCmd = true;
  intelBusId = "PCI:0:2:0";
  nvidiaBusId = "PCI:1:0:0";
};
```

---
layout: comparison
---

# Imperative vs Declarative

::left::

## Using CLIs

- Prone to mistakes when done manually
- Must memorise all the commands to check the state of your system
- Best way you could possibly track the evolution of your deployment is by git tracking a shell script
- Different machines will have different states, making it hard to reproduce your setup

::right::

## Using `configuration.nix`

- Clear specification of the desired state of the application
- Handles dependencies and order of operations automatically
- Idempotent, can be applied multiple times without issues
- git track the declarative specification of your deployment with git
