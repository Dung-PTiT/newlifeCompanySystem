package company.newlife.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tag")
public class TagEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "code", nullable = false, unique = true, length = 128)
    private String code;

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity categoryEntity;
}
