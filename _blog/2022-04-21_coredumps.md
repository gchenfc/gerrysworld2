---
title: "Segfault Coredumps"
postType: "tutorial"
description: "Instructions on accessing coredumps from c++ segfaults."
date: Apr. 21, 2022
redirect_from: "/blog/2022-04-21.html"
---

<div class="wrap-collapsible">
  <input id="collapsible" class="toggle" type="checkbox" checked> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible" class="lbl-toggle">Table of Contents</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

- [Background](#background)
- [Obtaining the coredump file](#obtaining-the-coredump-file)
  - [Ubuntu](#ubuntu)
  - [Mac](#mac)
- [Reading the coredump file](#reading-the-coredump-file)
- [References](#references)

</div>
  </div>
</div>

# Background

If you've spent any time with c++, you probably know how frustrating segfaults can be, which give the totally useless debug message:

```Segmentation fault (core dumped)```

Although I have on occasion used gdb/lldb (or rather, [vscode's debugger gui for gdb/lldb](https://code.visualstudio.com/docs/cpp/cpp-debug)), I always found this to be a big pain and 9/10 times it was easier/faster to just throw in random print statements until I narrowed down the issue.

But I finally decided it was time to figure out where I could find this "core" that was "dumped" and how to read it.

# Obtaining the coredump file

## Ubuntu

Some generally useful info here[^overview], but they don't use Apport.

Core dumps *should* already be saved, but there's 2 things that you may have to set:
1. `ulimit` - this specifies how large the crash logs can be.  Set it to e.g. `ulimit -c unlimited` if it isn't already.
2. `sysctl kernel.core_pattern` - this specifies where the crash logs get saved to.  By default on ubuntu they get processed by `apport`, i.e. `kernel.core_pattern = |/usr/share/apport/apport %p %s %c %d %P`
    * By default, Apport logs get saved in `/var/log/apport.log` or `/var/crash/apport.log`.
    * By default, Apport does *not* save crash dumps if the "executable does not belong to a package", e.g. the log will just say:
      ```
      ERROR [[...]]: executable does not belong to a package, ignoring
      ```
      To get it to still save these crash dumps, we follow the instructions here[^apport]:
        > Add the following lines to ~/.config/apport/settings (create it if it doesn't exist):
        > ```
        > [main]
        > unpackaged=true
        > ```
        > Now crashes will appear as Apport .crash files in /var/crash. You can unpack them with apport-unpack.

      To find exactly where in `/var/crash` the .crash file got saved, you can check in `/var/log/apport.log` where it will tell you in pretty plain english (in the last line):
      ```
      ERROR [[...]]: called for pid 10922, signal 11, core limit 0, dump mode 1
      ERROR [[...]]: executable: /home/gerry/gtsam/build/gtsam/nonlinear/tests/testSerializationNonlinear (command line "./testSerializationNonlinear")
      ERROR [[...]]: gdbus call error: Error: GDBus.Error:org.freedesktop.DBus.Error.ServiceUnknown: The name org.gnome.SessionManager was not provided by any .service files

      ERROR [[...]]: debug: session gdbus call: 
      ERROR [[...]]: wrote report /var/crash/_home_gerry_gtsam_build_gtsam_nonlinear_tests_testSerializationNonlinear.1000.crash
      ```
      Then just do:
      ```sh
      mkdir crash_log_contents
      apport-unpack /var/crash/[[crash_log]].crash crash_log_contents
      ```
      (where `[[crash_log]]` denotes the name of the crash log file)

      The coredump file will be `crash_log_contents/CoreDump`

Move on to [reading the coredump file](#reading-the-coredump-file)

## Mac

This is really annoying on newer MacOSes (e.g. 11.5.2).  I recommend just not doing it.

You need to do a few things:

1. make sure `sysctl kern.coredump` is 1 and `sysctl kern.core`
2. make sure `/cores` is writable and has the permissions "sticky bit" set: `chmod 1777 /cores` (yes, I hate the 777 too)
3. make sure `ulimit` is large enough, e.g. with `ulimit -c unlimited`.
    * Important: run this command in the current terminal window, even if you ran it before in a different window or if `ulimit` returns `unlimited`.  I don't know why but this is necessary.
4. Sign the executable using instructions from [^m1codesign] [^m1codesign_so].  Ugh, what a drag.
   ```sh
   /usr/libexec/PlistBuddy -c "Add :com.apple.security.get-task-allow bool true" /tmp/tmp.entitlements
   codesign -s - -f --entitlements /tmp/tmp.entitlements [[executable]]
   ```
   I put this in a shell function[^script].
6. Run the executable and the output should contain something like:
   ```
   Segmentation fault: 11  (core dumped)
   ```
    woo !!!
7. Check in `/cores/` to see the coredump.  Notice that it's very large (>2GB) so it may take a while to actually core dump (the program will freeze at the segfault location for a couple seconds).  Be sure to delete the coredump file after done analyzing, since it's so big.

Move on to [reading the coredump file](#reading-the-coredump-file)

# Reading the coredump file

Continuing the instructions from [^overview], we can view the core dump file with e.g. gdb:

```sh
➜ gdb -c crash_report/CoreDump
(gdb) symbol-file ./gtsam/nonlinear/tests/testSerializationNonlinear
(gdb) sharedlibrary
(gdb) bt
```

or lldb[^stackoverflow_lldb_example]:

```sh
lldb [[executable]] -c /cores/core.[[XXX]]
(lldb) target create [[executable]] --core "/cores/core.[[XXX]]" # This line is autogenerated
(lldb) bt all
```

Note that I didn't include the outputs from all the commands, but there should be output after each command.

Of course, if you didn't compile with debugger symbols, then there won't be that much info.

We should also be able to view the coredump using vscode ([Memory dump debugging](https://code.visualstudio.com/docs/cpp/cpp-debug#_memory-dump-debugging)[^vscode]) but I haven't tried setting this up yet.

# References

[^overview]: [Overview on Linux](https://jvns.ca/blog/2018/04/28/debugging-a-segfault-on-linux/)
[^apport]: [set Apport to save crash logs even for "unpackaged" applications](https://stackoverflow.com/a/41556199/9151520)
[^vscode]: [vscode Memory dump debugging](https://code.visualstudio.com/docs/cpp/cpp-debug#_memory-dump-debugging)
[^m1codesign]: [Sign the code to enable core dump on mac](https://developer.apple.com/forums/thread/694233?answerId=695943022#695943022)
[^m1codesign_so]: [StackOverflow with the same mac code signing instructions](https://stackoverflow.com/a/70743050/9151520)
[^stackoverflow_lldb_example]: [StackOverflow answer containing a minimal lldb example](https://stackoverflow.com/a/21308843/9151520)
[^script]: ```
    function sign_coredump {
        /usr/libexec/PlistBuddy -c "Add :com.apple.security.get-task-allow bool true" tmp.entitlements
        codesign -s - -f --entitlements /tmp/tmp.entitlements $1
    }
    ```