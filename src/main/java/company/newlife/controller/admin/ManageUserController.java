package company.newlife.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class ManageUserController {
    @GetMapping("/manage/user")
    public String goToDashboard() {
        return "admin/users";
    }

    @PostMapping("/manage/user/add-edit")
    public ResponseEntity<String> addUser(@RequestParam String username,
                                          @RequestParam String password,
                                          @RequestParam String name,
                                          @RequestParam String role,
                                          @RequestParam String address,
                                          @RequestParam String email,
                                          @RequestParam String phoneNumber) {
        System.out.println(username);
        System.out.println(password);
        System.out.println(name);
        System.out.println(role);
        System.out.println(address);
        System.out.println(email);
        System.out.println(phoneNumber);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
