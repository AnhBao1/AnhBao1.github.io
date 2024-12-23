const foodData = {
  food: [
    {
      id: 0
    },
    {
      id: 1,
      name: "xôi gà",
      meal: [
        "sáng"
      ],
      ingrediences: [
        "gà",
        "gạo nếp"
      ],
      types: [
        "xôi",
        "khô"
      ]
    },
    {
      id: 2,
      name: "bánh mì chả",
      meal: [
        "sáng",
        "trưa"
      ],
      ingrediences: [
        "bánh mì",
        "chả",
        "patê"
      ],
      types: [
        "bánh mì"
      ]
    },
    {
      id: 3,
      name: "bò xào",
      meal: [
        "trưa",
        "tối"
      ],
      ingrediences: [
        "bò",
        "hành tây"
      ],
      types: [
        "mặn",
        "thịt"
      ]
    },
    {
      id: 4,
      name: "đậu băp luộc",
      meal: [
        "trưa",
        "tối"
      ],
      ingrediences: [
        "đậu bắp"
      ],
      types: [
        "rau"
      ]
    },
    {
      id: 5,
      name: "cơm",
      ingrediences: [
        "gạo"
      ],
      types: [
        "cơm"
      ]
    },
    {
      id: 7,
      name: "canh bí",
      ingrediences: [
        "bí"
      ],
      types: [
        "canh"
      ]
    },
    {
      id: 8,
      name: "dưa hấu",
      types: [
        "tráng miệng"
      ],
      ingrediences: [
        "dưa hấu"
      ]
    },
    {
      id: 9,
      name: "cá thu kho cà",
      meal: [
        "trưa",
        "tối"
      ],
      ingrediences: [
        "cá thu",
        "cà chua"
      ],
      types: [
        "mặn",
        "cá"
      ]
    },
    {
      id: 10,
      name: "rau muống xào",
      ingrediences: [
        "rau muống",
        "tỏi"
      ],
      types: [
        "rau"
      ]
    },
    {
      id: 11,
      name: "đậu hũ nhồi thịt",
      ingrediences: [
        "đậu hũ",
        "bò"
      ],
      types: [
        "mặn"
      ]
    },
    {
      id: 12,
      name: "bún thịt nướng",
      meal: [
        "sáng",
        "trưa"
      ],
      ingrediences: [
        "bún",
        "bò",
        "dưa leo"
      ]
    },
    {
      id: 13,
      name: "canh chua cá lóc",
      ingrediences: [
        "cá lóc",
        "cà chua",
        "thơm"
      ],
      types: [
        "canh",
        "cá"
      ]
    },
    {
      id: 14,
      name: "mì xào bò",
      meal: [
        "sáng",
        "trưa"
      ],
      ingrediences: [
        "bò",
        "mì"
      ],
      types: [
        "mì",
        "khô"
      ]
    },
    {
      id: 15,
      name: "mì vịt tiềm",
      meal: [
        "sáng",
        "tối"
      ],
      ingrediences: [
        "mì",
        "vịt"
      ],
      types: [
        "mì",
        "khô"
      ]
    },
    {
      id: 16,
      name: "cánh gà chiên nước mắm",
      meal: [
        "trưa",
        "tối"
      ],
      ingrediences: [
        "gà",
      ],
      types: [
        "gà",
        "mặn"
      ]
    },
    {
      id: 17,
      name: "hủ tiếu Nam Vang",
      meal: [
        "sáng",
        "trưa"
      ],
      ingrediences: [
        "hủ tiếu",
        "heo",
        "tôm"
      ],
      types: [
        "nước",
      ]
    }
  ],
  type: [
    {
      id: 0
    },
    {
      id: 1,
      name: "mặn",
      depend: [
        "cơm",
        2,
        3
      ]
    },
    {
      id: 2,
      name: "rau",
      depend: [
        "cơm",
        1,
        3
      ]
    },
    {
      id: 3,
      name: "canh",
      depend: [
        "cơm",
        1,
        2
      ]
    },
    {
      id: 4,
      name: "cơm",
      depend: [
        1,
        2,
        3
      ]
    }
  ]
}
